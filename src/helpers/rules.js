import { useTranslation } from 'react-i18next';
export const rules = () => {
  const { t } = useTranslation();
  const rules = {
    name: {
      required: {
        value: true,
        message: t("error_name_required"),
      },
      validate: {
        kytu: (value) =>
          !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
          t("error_name_kytu"),
      },
    },
    surname: {
      required: {
        value: true,
        message: t("error_surname_required"),
      },
      validate: {
        kytu: (value) =>
          !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
          t("error_surname_kytu"),
      },
    },
    batbuoc: {
      required: {
        value: true,
        message: t("error_batbuoc_required"),
      },
    },
    title: {
      required: {
        value: true,
        message: t("error_title_required"),
      },
      maxLength: {
        value: 160,
        message: t("error_title_maxlength"),
      },
    },
    text: {
      required: {
        value: true,
        message: t("error_text_required"),
      },
      maxLength: {
        value: 160,
        message: t("error_text_maxlength"),
      },
    },
    email: {
      required: {
        value: true,
        message: t("error_email_required"),
      },
      minLength: {
        value: 6,
        message: t("error_email_minlength"),
      },
      maxLength: {
        value: 160,
        message: t("error_email_maxlength"),
      },
      validate: {
        email: (value) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          t("error_email_kytu"),
      },
    },
    phone: {
      required: {
        value: true,
        message: t("error_phone_required"),
      },
      minLength: {
        value: 9,
        message: t("error_phone_minlength"),
      },
      maxLength: {
        value: 11,
        message: t("error_phone_maxlength"),
      },
      validate: {
        number: (value) =>
          /((03|05|07|08|09)+([0-9]{8})\b)/g.test(value) ||
          t("error_phone_kytu"),
      },
    },
    password: {
      required: {
        value: true,
        message: t("error_password_required"),
      },
      minLength: {
        value: 6,
        message: t("error_password_minlength"),
      },
      maxLength: {
        value: 160,
        message: t("error_password_maxlength"),
      },
      validate: {
        kytu: (value) =>
          !/[!@#$%^&*(),.?":{}|<>]/.test(value) ||
          t("error_password_kytu"),
      },
    },
    fileUpload: {
      required: {
        value: true,
        message: t("error_fileupload_required"),
      },
    },
    checkbox: {
      required: {
        value: true,
        message: t("error_checkbox_required"),
      },
    }
  }
  return rules
}
