import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authSlice } from "@/store/statsAuth";
import { useMemo } from "react";

const rootAction = {
    ...authSlice.actions,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
