export const APP_TITLE: string = "단축 URL 서비스 - Kooo 쿠우 단축 링크, 주소 줄이기";
export const APP_COLOR: string = "#1abc9c";
export const TYPE_COMPRESS: string = "compress";
export const TYPE_COPY: string = "copy";
export const DOMAIN: string = "https://kooo.kr";
export const DOMAIN_DEV: string = "http://localhost:3000";
// export const DOMAIN_DEV: string = "http://121.142.160.160:3000";

export const TYPE_SUCCESS: string = "success";
export const TYPE_ERROR: string = "error";
export const TYPE_FAIL: string = "fail";
export const TYPE_WARNING: string = "warning";
export const TYPE_INFO: string = "info";

export const urlSuccessMsg: string = `URL이 성공적으로 단축되었습니다!
URL 복사버튼을 눌러서 단축된 URL을 사용하세요.`;
export const urlFailMsg: string = "유효하지 않은 URL입니다.";
export const urlErrorMsg: string = "URL 변환 중 에러가 발생했습니다. 다시 한번 시도해주세요.";
export const urlCopyMsg: string = "클립보드에 복사되었습니다.";

export const titleText: string = `가독성 떨어지는 링크는 그만!`;
export const subText: string = `kooo에서 단축한 링크로 편리하게 공유하세요.`;

export const coupangText: string = `* 쿠팡파트너스 활동으로 소정의 수수료를 얻을 수 있습니다.`;

export interface SnackbarInfo {
  open: boolean;
  type: string;
  message: string;
}