import React, {useState, ChangeEvent} from 'react';
import './index.less';
import {REG} from '@/utils/constants';

interface InputItem {
  lab: string;
  type?: string;
  errText?: string | null;
  value: string|undefined;
  maxLength?: number;
  minLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  pattern?: string;
}


function InputItem (props: InputItem): JSX.Element {
  const {lab = '--', type = 'text', minLength, maxLength, errText = null, value, onChange, placeholder} = props;
  const [ err, setErr ] = useState(false);

  const onBlur = (val: string|undefined) => {
    if (!value){
      return;
    }
    if (type === 'email') {
        setErr(!REG.EMAIL.test(value));
        return;
    }

    if(lab === "Verification Code"){
        setErr(!REG.MSG_CODE.test(value));
        return;
    }

    if(lab === 'New Password') {
      setErr(!REG.PASSWORD.test(value));
      return;
    }

    if(lab === 'Confirm Password') {
      setErr(true);
      return;
    }


    val && setErr(val.length < 8);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    if (lab === 'Verification Code') {
      if ((value && Number(value) !== 0 && !Number(value)) || value.indexOf('.') >= 0) return;
    }

      onChange(e);
  };


  return (
    <label id="inputItem">
      {lab}
      <small className="err">{!err ? '' : errText}</small>
      <br />
      <input
      type={type}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      onChange={e => onInputChange(e)}
      onBlur={() => onBlur(value)}
      placeholder={placeholder}
      />
    </label>
  );
}

export default InputItem;
