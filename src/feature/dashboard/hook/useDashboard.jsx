import { useDispatch } from "react-redux";

const useDashboard = () => {
  const dispatch = useDispatch();
  return {
    dispatch,
  };
};

export default useDashboard;
