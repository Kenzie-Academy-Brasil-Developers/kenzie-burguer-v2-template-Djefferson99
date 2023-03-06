import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { Input } from '../Input';
import { UserContext, IFormDataRegister } from '../../../Providers/UserContext';

const formVerificationLogin = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);

  const labelEmail = 'email';
  const labelPassword = 'senha';
  const typeEmail = 'email';
  const typePassword = 'password';

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IFormDataRegister>({
    resolver: yupResolver(formVerificationLogin),
  });
  const messageEmail = errors.email && errors.email.message;
  const messagePassword = errors.password && errors.password.message;

  const submit: SubmitHandler<IFormDataRegister> = (formData) => {
    userLogin(formData);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
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
      <StyledButton $buttonSize='default' $buttonStyle='green' type='submit'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
