import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGame } from "../features/game/gameSlice";

function ConfirmationDialog({ gameId, isOpen, handleClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const handleWithdraw = () => {
    handleClose()
    dispatch(deleteGame(gameId));
    navigate("/home");
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-base/7 font-medium ">
            Confirmation
          </DialogTitle>
          <p className="mt-2 text-sm/6 ">
            Are you sure you want to delete the game?
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={handleClose}
            >
              No
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={handleWithdraw}
            >
              Yes
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;
