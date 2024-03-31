import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const EnterRoomId = () => {
  return (
    <InputOTP maxLength={6} className="w-full">
      <InputGroup inputs={[0, 1, 2]} />
      <InputOTPSeparator />
      <InputGroup inputs={[3, 4, 5]} />
    </InputOTP>
  );
};

type InputGroupProps = {
  inputs: number[];
};

const InputGroup = ({ inputs }: InputGroupProps) => {
  return (
    <InputOTPGroup>
      {inputs.map((s) => (
        <InputOTPSlot key={s} index={s} />
      ))}
    </InputOTPGroup>
  );
};

export default EnterRoomId;
