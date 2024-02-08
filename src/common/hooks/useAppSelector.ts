import { AppRootState } from "app/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
