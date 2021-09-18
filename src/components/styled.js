import tw, { css, styled } from 'twin.macro'

export const SubmitButton = styled.button(() => [
  css`
    border-radius: 33px;
    padding: 19px 32px;
    letter-spacing: 1px;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    margin-top: 10px;
    box-shadow: 0 0 10px rgba(140, 140, 140, 0.5);
  `,
  tw`text-white focus:outline-none bg-utblue`
])
