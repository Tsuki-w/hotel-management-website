"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type TToasterContext = {
  success: (msg: string) => void;
  error: (err: string) => void;
};

const ToasterContext = createContext<TToasterContext>({
  success: (msg: string) => {},
  error: (err: string) => {},
});

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  /**
   * 使用useCallback确保函数引用稳定，防止外部调用useEffect依赖于success或error函数时，message置空引起重新染导致函数引用变化1
   */
  const success = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const error = useCallback((err: string) => {
    setMessage(err);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <ToasterContext.Provider value={{ success, error }}>
      {children}
      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 py-3 px-6 rounded-full bg-accent-500 text-primary-800 text font-semibold shadow-xl shadow-slate-900 z-50 transition-all duration-300">
          {message}{" "}
          <span
            className="text-xl cursor-pointer"
            onClick={() => setMessage(null)}
          >
            x
          </span>
        </div>
      )}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster必须在ToasterProvider内部使用");
  }
  return context;
};

export default ToasterProvider;
