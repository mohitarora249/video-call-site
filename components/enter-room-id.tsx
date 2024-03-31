import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ROOM_ID_LENGTH } from "@/constants";

type Props = {
  roomId: string;
  onChange: (v: string) => void;
};
/**
 * Renders an input field for entering a room ID.
 *
 * @param {Props} roomId - The current value of the room ID.
 * @param {function} onChange - A callback function to handle changes in the room ID.
 * @return {JSX.Element} The rendered input field for entering a room ID.
 */
const EnterRoomId = ({ roomId, onChange }: Props) => {
  return (
    <InputOTP
      value={roomId}
      onChange={(v) => onChange(v)}
      maxLength={ROOM_ID_LENGTH}
      className="w-full"
    >
      <InputGroup inputs={[0, 1, 2, 3, 4, 5, 6, 7]} />
    </InputOTP>
  );
};

type InputGroupProps = {
  inputs: number[];
};

/**
 * Renders an InputGroup component based on the provided inputs.
 *
 * @param {InputGroupProps} inputs - The inputs for the InputGroup component.
 * @return {JSX.Element} The rendered InputGroup component.
 */
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
