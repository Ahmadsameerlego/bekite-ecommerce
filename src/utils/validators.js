// دوال validation مرنة وقابلة لإعادة الاستخدام

export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

export function isEmail(value) {
  if (!isRequired(value)) return true; // لو مش مطلوب
  const re = /^\S+@\S+\.\S+$/;
  return re.test(value);
}

export function isPhone(value) {
  if (!isRequired(value)) return true;
  // يقبل أرقام فقط وطوله من 7 إلى 15 رقم
  const re = /^\d{7,15}$/;
  return re.test(value);
}

export function minLength(value, min) {
  if (!isRequired(value)) return true;
  return value.length >= min;
}

export function maxLength(value, max) {
  if (!isRequired(value)) return true;
  return value.length <= max;
}

// دالة عامة لتجميع الأخطاء
export function validate(fields, rules) {
  const errors = {};
  for (const key in rules) {
    const value = fields[key];
    const fieldRules = rules[key];
    for (const rule of fieldRules) {
      let valid = true;
      let message = '';
      if (typeof rule === 'string') {
        switch (rule) {
          case 'required':
            valid = isRequired(value);
            message = 'هذا الحقل مطلوب';
            break;
          case 'email':
            valid = isEmail(value);
            message = 'البريد الإلكتروني غير صحيح';
            break;
          case 'phone':
            valid = isPhone(value);
            message = 'رقم الهاتف غير صحيح';
            break;
        }
      } else if (typeof rule === 'object') {
        if (rule.minLength) {
          valid = minLength(value, rule.minLength);
          message = `يجب ألا يقل عن ${rule.minLength} أحرف`;
        }
        if (rule.maxLength) {
          valid = maxLength(value, rule.maxLength);
          message = `يجب ألا يزيد عن ${rule.maxLength} أحرف`;
        }
      }
      if (!valid) {
        errors[key] = message;
        break; // أول خطأ فقط
      }
    }
  }
  return errors;
}
