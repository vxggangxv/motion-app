/**
 * 공백있나 없나 체크
 * @param {string} value
 */
export function checkSpace(value) {
  return value && value.search(/\s/) !== -1;
}

export const regPasswordExp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;
/**
 * 정규식 비밀번호 유효성 검사
 * @param {string} value
 */
export function regPassword(value) {
  if (checkSpace(value)) return false;
  // 8~16자리 글자, 영어,대문자소문자,특수문자
  // let regExp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  // 8~16자리 글자, 영어,대문자소문자
  let regExp = regPasswordExp;
  return regExp.test(value);
}

/**
 * 숫자만
 * @param {number} value
 */
export function regNumber(value) {
  if (typeof value !== 'number' && !value) return false;
  if (checkSpace(value)) return false;
  let regExp = /^[0-9]*$/g;
  // let regExp = /^[\d]$/g;
  return regExp.test(value);
}

/**
 * 정규식 번호(폰, 전화)
 * 숫자 - 숫자 (시작 숫자, 하이픈 포함, 마지막 숫자 형식)
 * @param {string} value
 */
export function regPhone(value) {
  // /^\d{2,3}-\d{3,4}-\d{4}$/
  let regExp = /^[\d]+-[\d]+([-]?[\d])*$/;
  return regExp.test(value);
}

export const regEmailExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
/**
 * 정규식 이메일 유효성 검사
 * @param {string} value
 */
export function regEmail(value) {
  if (checkSpace(value)) return false;
  let regExp = regEmailExp;
  return regExp.test(value);
}

/**
 * 정규식 이름 유효성 검사
 * @param {string} value
 */
export function regName(value) {
  let regExp = /^[\s0-9a-zㄱ-ㅎ가-힣_-]{0,100}$/i;
  return regExp.test(value);
}

// eslint-disable-next-line no-useless-escape
export const reqProjectInput = /[\/\?\*\:\<\>\|\"\n]/g;
export const reqRemoveTag = /(<([^>]+)>)/gi;

/**
 * 정규식 글자 제한
 * @param {number} len
 * @param {string} value
 * @param {boolean} bool 마지막 boolean으로 1번째부터인지 0번째부터인지?
 */
export function regLength(len, value, bool) {
  try {
    value = value.toString().trim();
  } catch (e) {
    console.log(e, 'error');
  }
  let regExp = bool ? new RegExp(`^.{${len},${len}}$`) : new RegExp(`^.{1,${len}}$`);
  return regExp.test(value);
}

/**
 * 숫자만 입력
 * @param {*} value
 */
export function inputNumber(value) {
  return value.replace(/[^0-9]/g, '');
}

/**
 * 양수 확인
 * @param {number} x
 * @returns {boolean}
 */
export function isPositive(x) {
  return Number(x) >= 0;
}

/**
 * 정수 확인
 * @param {number} n
 * @returns {boolean}
 */
export function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

/**
 * 실수 확인
 * @param {number} n
 * @returns {boolean}
 */
export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

/**
 * 정수 또는 실수 확인
 * @param {number} n
 * @returns {boolean}
 */
export function isIntOrFloat(n) {
  if (typeof n !== 'number' && !n) return false;
  return (Number(n) === n && n % 1 === 0) || (Number(n) === n && n % 1 !== 0);
}

/**
 * 3자리 단위마다 콤마 생성
 * @param {number} x
 */
export function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 모든 콤마 제거
 * @param {number} x
 */
export function removeCommas(x) {
  if (!x || x.length == 0) return '';
  else return x.split(',').join('');
}
