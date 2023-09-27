/* eslint-disable react/prop-types */
export const Backdrop = ({ children }) => {
  return (
    <div className="grid place-items-center absolute inset-0 backdrop-blur-[5px] z-10">
      <div className="w-1/2 rounded-sm bg-slate-400 p-10">{children}</div>
    </div>
  );
};
