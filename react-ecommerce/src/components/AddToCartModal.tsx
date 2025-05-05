import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function AddToCartModal({
  isOpen,
  onClose,
  productName,
}: Props) {
  const navigate = useNavigate();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
              <Dialog.Title className="text-xl font-semibold mb-2">
                ✅ {productName} ajouté au panier !
              </Dialog.Title>
              <p className="text-gray-600 mb-4">
                Souhaitez-vous continuer vos achats ou voir le panier ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Continuer
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Aller au panier
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
