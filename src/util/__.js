const ar = {
  start_at: "من",
  end_at: "إلى",
  super_admin: "حساب إدارة النظام",
  normal: "عضو",
  admin: "رئيسا أو نائبا",
  phone: "رقم الهاتف",
  password: "كلمة المرور",
};

export default function __(key) {
  return ar[key] || key;
}
