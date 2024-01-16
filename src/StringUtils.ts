interface PasswordStrengthRules {
  minNumber?: number;
  minLowerCase?: number;
  minUpperCase?: number;
  minSpecialChar?: number;
  minLength?: number;
  maxLength?: number;
  maxSequencingSubStringLength?: number;
  maxContinousRepeatedCharsCount?: number;
  allowedSpecialChars?: string | Array<string>;
  pattern?: string | RegExp;
}

type PasswordStrengthCheckItemResult = -1 | 0 | 1;

type PasswordStrengthCheckItem = {
  [key in keyof PasswordStrengthRules]: PasswordStrengthCheckItemResult;
};

interface PasswordStrengthResult {
  checked: number;
  passed: number;
  failed: number;
  detail: {
    password: string;
    internalPassword: string;
    rules?: PasswordStrengthRules;
    internalRules: PasswordStrengthRules;
    checkItems: PasswordStrengthCheckItem;
  };
}

/**
 * @description 根据范围获取 ASII 字符数组
 * @param start
 * @param end
 * @default (33, 33) => ['!']
 * @returns
 */
export function getASCIICharsInRange(start = 33, end = 0) {
  if (!start || start < 34) start = 33;
  if (!end) end = start;
  if (end < start) [start, end] = [end, start];
  return Array.from({ length: end - start + 1 }, (_, i) => String.fromCharCode(start + i));
}

/**
 * @description 是否是顺续规则字符串
 * @param string
 * @param step
 * @default ("", 1) => true
 * @returns
 */
export function isSequencingString(string = "", step = 1) {
  const chars = string.split("");
  return chars.every((char, i) => {
    if (i === chars.length - 1) return true;
    const charCode = char.charCodeAt(0);
    const nextChar = chars[i + 1];
    const nextCharCode = nextChar.charCodeAt(0);
    return charCode + step === nextCharCode;
  });
}

/**
 * @description 是否有顺续规则字符串
 * @todo TODO: 这里算法有问题，应使用其他算法
 * @param string
 * @param length
 * @default ("", 2) => false
 * @returns
 */
export function hasSequencingSubString(string = "", length = 2) {
  let l = Math.max(Math.floor(length) || 2, 2);
  if (l >= string.length) l = string.length;
  const sequenceChars = new RegExp(
    `([0-9]{${l},})|([a-z]{${l},})|([A-Z]{${l},})([0-9]{${l},})|([a-z]{${l},})|([A-Z]{${l},})`,
    "gm"
  );
  const matches = string.matchAll(sequenceChars);
  for (const match of matches) {
    if (isSequencingString(match[0], 1)) return true;
    if (isSequencingString(match[0], -1)) return true;
  }
  return false;
}

/**
 * 是否有连续重复的字符串
 * @param string 被检测字符串
 * @param length 重复次数
 * @default ("", 2) => false
 * @returns
 */
export function hasContinousRepeatedChars(string = "", repeat = 2) {
  const s = String(string);
  let r = Math.max(Math.floor(repeat) || 2, 2);
  if (r >= s.length) r = s.length;
  if (r < 2) r = 2;
  const sameChars = new RegExp(`(.)\\1{${r - 1},}`, "gm");
  return !!s.match(sameChars);
}

/**
 * @description 密码强度校验
 * @notice 在规则和结果中，falsy 值（ 0, undefined, null, false, '' ）等表示不做/未做检查； -1 表示检查失败； 1 表示检查通过；
 * @author shihongxins
 * @param password 密码
 * @param rules 校验规则
 * @returns 校验结果
 */
export function passwordStrengthInspector(password: string, rules?: PasswordStrengthRules): PasswordStrengthResult {
  // copy arguments
  const internalPassword = String(password || "");
  const _rules = Object.assign(
    {
      minNumber: 0,
      minLowerCase: 0,
      minUpperCase: 0,
      minSpecialChar: 0,
      minLength: 4,
      maxLength: 0,
      maxSequencingSubStringLength: 3,
      maxContinousRepeatedCharsCount: 2,
      allowedSpecialChars: "",
    },
    rules
  );

  // rules
  let minNumber = Math.max(Math.floor(_rules.minNumber) || 0, 0);
  let minLowerCase = Math.max(Math.floor(_rules.minLowerCase) || 0, 0);
  let minUpperCase = Math.max(Math.floor(_rules.minUpperCase) || 0, 0);
  let minSpecialChar = Math.max(Math.floor(_rules.minSpecialChar) || 0, 0);
  let minLength = Math.max(Math.floor(_rules.minLength) || 4, 4);
  let maxLength = Math.max(Math.floor(_rules.maxLength) || 0, 0);
  const maxSequencingSubStringLength = Math.max(Math.floor(_rules.maxSequencingSubStringLength) || 3, 3);
  const maxContinousRepeatedCharsCount = Math.max(Math.floor(_rules.maxContinousRepeatedCharsCount) || 2, 2);
  if (!(minUpperCase || minLowerCase || minNumber || minSpecialChar)) {
    minUpperCase = 1;
    minLowerCase = 1;
    minNumber = 1;
    minSpecialChar = 1;
  }
  const minCharsLength = minUpperCase + minLowerCase + minNumber + minSpecialChar;
  if (minLength < 4 || minLength < minCharsLength) {
    minLength = Math.max(minCharsLength || 4, 4);
  }
  if (maxLength && maxLength < minLength) {
    maxLength = minLength;
  }
  let allowedSpecialChars = "";
  if (minSpecialChar > 0) {
    if (_rules.allowedSpecialChars) {
      if (Array.isArray(_rules.allowedSpecialChars)) {
        allowedSpecialChars = _rules.allowedSpecialChars.join("");
      } else {
        allowedSpecialChars = String(_rules.allowedSpecialChars);
      }
    }
    if (!allowedSpecialChars) {
      allowedSpecialChars = getASCIICharsInRange(33, 126).join("").replace(/\w|\s/gm, "").replace(/\\/, "_");
    }
  }
  let pattern: RegExp | undefined = void 0;
  if (_rules.pattern) {
    if (typeof _rules.pattern === "string") {
      pattern = new RegExp(_rules.pattern, _rules.pattern.match(/[gimuy]*$/)?.[0] || "gm");
    } else {
      pattern = _rules.pattern;
    }
  }
  const globalPattern = [];

  // result
  const checkItems: PasswordStrengthCheckItem = {
    minNumber: void 0,
    minLowerCase: void 0,
    minUpperCase: void 0,
    minSpecialChar: void 0,
    minLength: void 0,
    maxLength: void 0,
    maxSequencingSubStringLength: void 0,
    allowedSpecialChars: void 0,
    pattern: void 0,
  };

  // check
  if (minNumber > 0) {
    const patternNumber = new RegExp(`[0-9]`, "gm");
    globalPattern.push(patternNumber);
    const minNumberCount = internalPassword.match(patternNumber)?.length || 0;
    checkItems.minNumber = minNumberCount < minNumber ? -1 : 1;
  }
  if (minLowerCase > 0) {
    const patternLowercase = new RegExp(`[a-z]`, "gm");
    globalPattern.push(patternLowercase);
    const minLowerCaseCount = internalPassword.match(patternLowercase)?.length || 0;
    checkItems.minLowerCase = minLowerCaseCount < minLowerCase ? -1 : 1;
  }
  if (minUpperCase > 0) {
    const patternUppercase = new RegExp(`[A-Z]`, "gm");
    globalPattern.push(patternUppercase);
    const minUpperCaseCount = internalPassword.match(patternUppercase)?.length || 0;
    checkItems.minUpperCase = minUpperCaseCount < minUpperCase ? -1 : 1;
  }
  if (minLength > 0) {
    checkItems.minLength = internalPassword.length < minLength ? -1 : 1;
  }
  if (maxLength > 0) {
    checkItems.maxLength = internalPassword.length > maxLength ? -1 : 1;
  }
  if (maxSequencingSubStringLength > 0) {
    checkItems.maxSequencingSubStringLength = hasSequencingSubString(internalPassword, maxSequencingSubStringLength)
      ? -1
      : 1;
  }
  if (maxContinousRepeatedCharsCount > 0) {
    checkItems.maxContinousRepeatedCharsCount = hasContinousRepeatedChars(
      internalPassword,
      maxContinousRepeatedCharsCount
    )
      ? -1
      : 1;
  }
  if (allowedSpecialChars || minSpecialChar > 0) {
    const specialChars = globalPattern.reduce((string, gp) => {
      return string.replace(gp, "");
    }, internalPassword);
    checkItems.minSpecialChar = specialChars.length < minSpecialChar ? -1 : 1;
    checkItems.allowedSpecialChars = specialChars.split("").some((char) => !allowedSpecialChars.includes(char))
      ? -1
      : 1;
  }
  if (pattern) {
    checkItems.pattern = !pattern.test(internalPassword) ? -1 : 1;
  }
  const checkItemsEntries = Object.entries(checkItems);
  const checked = checkItemsEntries.filter(([, value]) => value).length;
  const passed = checkItemsEntries.filter(([, value]) => value > 0).length;
  const failed = checkItemsEntries.filter(([, value]) => value < 0).length;

  return {
    checked,
    passed,
    failed,
    detail: {
      password,
      internalPassword,
      rules,
      internalRules: {
        minNumber,
        minLowerCase,
        minUpperCase,
        minLength,
        maxLength,
        maxSequencingSubStringLength,
        maxContinousRepeatedCharsCount,
        minSpecialChar,
        allowedSpecialChars,
        pattern,
      },
      checkItems,
    },
  };
}
