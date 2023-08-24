
import { MdOutlineShoppingCart } from "react-icons/md";
const CartIcon = ({ itemCount }) => {
  return (
    <div className="relative">
      <MdOutlineShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="text-primary-red font-medium text-center  p-1 rounded-full w-5 h-5  float-right shrink-0 grow-0 text-xs absolute bottom-0 right-0 mr-3 mb-3">
          {itemCount}
        </span>
      )}
    </div>
  );
};
export default CartIcon;
