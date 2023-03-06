import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext, IFormDataRegister } from '../../../Providers/UserContext';

const formVerificationRegister = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Deve ter pelo menos 6 caracteres'),
  password2: yup
    .string()
    .required('Confirmação obrigatória')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
});

const RegisterForm = () => {
  const { userResgister } = useContext(UserContext);

  const labelName = 'name';
  const labelEmail = 'email';
  const labelPassword = 'senha';
  const labelConfirmPassword = 'Confirmação de senha';
  const typeText = 'text';
  const typeEmail = 'email';
  const typePassword = 'password';
  const password2 = 'password2';

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormDataRegister>({
    resolver: yupResolver(formVerificationRegister),
  });

  const messageName = errors?.name && errors.name.message;
  const messageEmail = errors.email && errors.email.message;
  const messagePassword = errors.password && errors.password.message;
  const messagePassword2 = errors.password2 && errors.password2.message;

  const submit: SubmitHandler<IFormDataRegister> = (formData) => {
    userResgister(formData);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label={labelName}
        message={messageName}
        type={typeText}
        register={register(labelName)}
      />
      <Input
        label={labelEmail}
        message={messageEmail}
        type={typeEmail}
        register={register(labelEmail)}
      />
      <Input
        label={labelPassword}
        message={messagePassword}
        type={typePassword}
        register={register(typePassword)}
      />
      <Input
        label={labelConfirmPassword}
        message={messagePassword2}
        type={typePassword}
        register={register(password2)}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};
export default RegisterForm;
