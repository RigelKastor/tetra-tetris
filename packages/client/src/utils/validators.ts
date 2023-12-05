type Rule = {
  message: string
  pattern: RegExp
}
const ruleMap = new Map<string, Rule>()
ruleMap.set('login', {
  message:
    'Логин должен быть от 3 до 20 символов, латиница, может содержать цифры,\
но не состоять из них, без пробелов,\
без спецсимволов (допустимы дефис и нижнее подчёркивание',
  pattern: /^[a-zA-Z][a-zA-Z0-9-_.]{2,20}$/,
})
ruleMap.set('name', {
  message:
    'Латиница или кириллица,\n\
     первая буква должна быть заглавной,\n\
    без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  pattern: /^[A-ZА-Я][a-zа-яA-ZА-Я-.]{1,}$/,
})
ruleMap.set('email', {
  message:
    'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@)\
     и точка после неё, но перед точкой обязательно должны быть буквы',
  pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+.)+[A-z]{2,4}$/,
})
ruleMap.set('password', {
  message:
    'Пароль должен быть от 8 до 40 символов,\
    обязательно хотя бы одна заглавная буква и цифра',
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}/,
})
ruleMap.set('phone', {
  message:
    'Телефон должен быть строкой от 10 до 15 символов,\
    состоит из цифр, может начинается с плюса',
  pattern: /^[+|0-9][0-9]{9,15}$/,
})
const validate = (field: string, value: string) => {
  const rule = ruleMap.get(field)
  if (!rule) return Promise.reject(new Error('unknown rule'))
  if (rule.pattern.test(value)) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(rule.message))
  }
}

export { validate }
