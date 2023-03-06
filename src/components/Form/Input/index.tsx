import { UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInput {
  label: string;
  message: string | undefined;
  type: string;
  register: UseFormRegisterReturn;
}

export const Input = ({ label, message, type, register }: IInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    <StyledParagraph fontColor='red'>{message}</StyledParagraph>
  </fieldset>
);
