import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterPrompt from 'react-router-prompt';

const LeavePrompt = ({ callback, when, text }) => {
  const _text = text || 'Do you really want to leave?';
  return ReactDOM.createPortal(
    <ReactRouterPrompt when={when}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <div className='flex w-full h-full justify-center absolute items-center'>
            <div className='w-[600px] h-[300px] z-50 top-50 bg-yellow-200 border-red-700 border-2 rounded-3xl p-8 backdrop-blur-sm'>
              <p>{_text}</p>
              <button onClick={onCancel}>Cancel</button>
              <button
                onClick={() => {
                  callback();
                  onConfirm();
                }}
              >
                Ok
              </button>
            </div>
          </div>
        )
      }
    </ReactRouterPrompt>,
    document.getElementById('portal')
  );
};

export default LeavePrompt;
