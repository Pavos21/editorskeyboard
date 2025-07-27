class SerialHandler {
  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();
  private listeningForDisconnect = false;

  async init(baudRate = 115200) {
    if ('serial' in navigator) {
      const nav = navigator as Navigator & { serial: Serial };
      this.port = await nav.serial.requestPort();
      if (!this.port) throw new Error('No serial port selected');

      await this.port.open({ baudRate });
      this.writer = this.port.writable?.getWriter() ?? null;
      this.reader = this.port.readable?.getReader() ?? null;
    } else {
      throw new Error('Web Serial API not supported');
    }
  }

  async write(data: string) {
    if (!this.writer) throw new Error('Writer not available');
    await this.writer.write(this.encoder.encode(data));
  }

  async read(): Promise<string> {
    if (!this.reader) throw new Error('Reader not available');
    const { value, done } = await this.reader.read();
    if (done) {
      await this.reader.releaseLock();
      return '';
    }
    return this.decoder.decode(value);
  }

  /** Start listening for "disconnect" after Upload data clicked */
  async startDisconnectListener() {
    if (this.listeningForDisconnect || !this.reader) return;
    this.listeningForDisconnect = true;

    (async () => {
      while (this.listeningForDisconnect && this.reader) {
        try {
          const { value, done } = await this.reader.read();
          if (done || !value) break;

          const message = this.decoder.decode(value).trim();
          console.log("Received:", message);

          if (message === 'ready-to-reboot') {
            await serialHandler.close();
            console.log("Device is ready to reboot, closing serial port.");
            break;
          }
        } catch (e) {
          console.error("Error in disconnect listener:", e);
          break;
        }
      }
      this.listeningForDisconnect = false;
    })();
  }

  async close() {
    this.listeningForDisconnect = false;
    if (this.reader) {
      await this.reader.cancel();
      await this.reader.releaseLock();
      this.reader = null;
    }
    if (this.writer) {
      await this.writer.close();
      await this.writer.releaseLock();
      this.writer = null;
    }
    if (this.port) {
      await this.port.close();
      this.port = null;
    }
    console.log("Serial port closed.");
  }
}

export const serialHandler = new SerialHandler();