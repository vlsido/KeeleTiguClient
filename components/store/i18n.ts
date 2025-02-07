import { I18n } from "i18n-js";
import ee from "i18n-js/json/en.json";
import ru from "i18n-js/json/ru.json";

export const i18n = new I18n({
  ...ee,
  ...ru,
});

i18n.pluralization.register(
  "ee",
  (
    _i18n, count
  ) => {
    return count === 1 ? [
      "one"
    ] : [
      "other"
    ];
  }
);

i18n.pluralization.register(
  "ru",
  (
    _i18n, count
  ) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    let key: string;

    const one = mod10 === 1 && mod100 !== 11;
    const few = [
      2,
      3,
      4
    ].includes(mod10) && ![
      12,
      13,
      14
    ].includes(mod100);
    const many =
      mod10 === 0 ||
      [
        5,
        6,
        7,
        8,
        9
      ].includes(mod10) ||
      [
        11,
        12,
        13,
        14
      ].includes(mod100);

    if (one) {
      key = "one";
    } else if (few) {
      key = "few";
    } else if (many) {
      key = "many";
    } else {
      key = "other";
    }

    return [
      key
    ];
  }
);
