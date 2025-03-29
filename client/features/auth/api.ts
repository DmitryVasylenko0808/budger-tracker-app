import axios from 'axios';

import { instance } from '../../lib/instance';

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type ConfirmEmailParams = {
  token: string;
};

type ResendConfirmEmailParams = {
  email: string;
};

type ResetPasswordParams = {
  email: string;
};

type ChangePasswordParams = {
  password: string;
  token: string;
};

type VerifyToggleTwoFaParams = {
  code: string;
};

type TwoFaVerifyParams = {
  code: string;
};

type ResendTwoFaCodeParamas = {
  email: string;
};

export class AuthApi {
  static async signUp(data: SignUpParams) {
    try {
      const res = await instance.post('/auth/sign-up', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async signIn(data: SignInParams) {
    try {
      const res = await instance.post('/auth/sign-in', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async confirmEmail(data: ConfirmEmailParams) {
    try {
      const res = await instance.post('/auth/email-confirmation/confirm', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async resendConfirmationEmail(data: ResendConfirmEmailParams) {
    try {
      const res = await instance.post('/auth/email-confirmation/resend', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async resetPassword(data: ResetPasswordParams) {
    try {
      const res = await instance.post('/auth/password-recovery/reset', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async changePassword(data: ChangePasswordParams) {
    try {
      const res = await instance.post('/auth/password-recovery/change-password', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async toggleTwoFa() {
    try {
      const res = await instance.post('/auth/two-factor/toggle');
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async verifyToggleTwoFa(data: VerifyToggleTwoFaParams) {
    try {
      const res = await instance.post('/auth/two-factor/toggle/verify', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async twoFaVerify(data: TwoFaVerifyParams) {
    try {
      const res = await instance.post('/auth/two-factor/verify', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async resendTwoFaCode(data: ResendTwoFaCodeParamas) {
    try {
      const res = await instance.post('/auth/two-factor/resend-code', data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
