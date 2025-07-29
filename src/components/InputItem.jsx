import React from 'react'

function InputItem(props) {
    return (
        <div className='mt-2'>
            <label name={props.name} htmlFor={props.name} className='font-normal text-xl'>{props.content}</label>
            <input
            onChange={props.handelChange}
            onBlur={props.handelBlur}
            value={props.value}
            placeholder='em' type={props.type} id={props.name} className={`w-full rounded-xl border-2 border-[#D1D1DB] px-4 py-2 mt-1 placeholder:text-[#D1D1DB] ${props.className}`}></input>
            {props.errors && props.touched ? (
        <div
          className="flex p-0 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {/* <span className="sr-only">Danger</span> */}
          <div>
            <ul className="mt-1.5 list-disc list-inside">
              {props.errors.split(",").map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
        </div>
    )
}

export default InputItem