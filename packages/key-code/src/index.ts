import KeyCodes from './config';

class KeyCode {
  public codes: {
    [key: string]: number;
  };

  constructor() {
    this.codes = KeyCodes;
  }

  isTextModifyingKeyEvent = (e: KeyboardEvent): boolean => {
    const keyCode = e.keyCode;
    if (
      (e.altKey && !e.ctrlKey) ||
      e.metaKey ||
      (keyCode >= this.codes.F1 && keyCode <= this.codes.F12)
    ) {
      return false;
    }

    switch (keyCode) {
      case this.codes.ALT:
      case this.codes.CAPS_LOCK:
      case this.codes.CONTEXT_MENU:
      case this.codes.CTRL:
      case this.codes.DOWN:
      case this.codes.END:
      case this.codes.ESC:
      case this.codes.HOME:
      case this.codes.INSERT:
      case this.codes.LEFT:
      case this.codes.MAC_FF_META:
      case this.codes.META:
      case this.codes.NUMLOCK:
      case this.codes.NUM_CENTER:
      case this.codes.PAGE_DOWN:
      case this.codes.PAGE_UP:
      case this.codes.PAUSE:
      case this.codes.PRINT_SCREEN:
      case this.codes.RIGHT:
      case this.codes.SHIFT:
      case this.codes.UP:
      case this.codes.WIN_KEY:
      case this.codes.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  };

  isCharacterKey = (keyCode: number) => {
    if (keyCode >= this.codes.ZERO && keyCode <= this.codes.NINE) {
      return true;
    }

    if (keyCode >= this.codes.NUM_ZERO && keyCode <= this.codes.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= this.codes.A && keyCode <= this.codes.Z) {
      return true;
    }

    // @ts-ignore
    if (window.navigator.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case this.codes.SPACE:
      case this.codes.QUESTION_MARK:
      case this.codes.NUM_PLUS:
      case this.codes.NUM_MINUS:
      case this.codes.NUM_PERIOD:
      case this.codes.NUM_DIVISION:
      case this.codes.SEMICOLON:
      case this.codes.DASH:
      case this.codes.EQUALS:
      case this.codes.COMMA:
      case this.codes.PERIOD:
      case this.codes.SLASH:
      case this.codes.APOSTROPHE:
      case this.codes.SINGLE_QUOTE:
      case this.codes.OPEN_SQUARE_BRACKET:
      case this.codes.BACKSLASH:
      case this.codes.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  };
}

export default new KeyCode();
