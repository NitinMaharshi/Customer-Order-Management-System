
const Confirm = ({ modalContent, toggleModal, handelFunction, buttonDisable }) => (
  <div id="popup-modal" className="overflow-y-auto overflow-x-hidden flex fixed  justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm z-[1000]">
    <div className="relative p-4 w-full max-w-md max-h-full z-30">
      <div className="relative bg-white border border-black rounded-lg shadow-2xl z-50">
        <button type="button" className="absolute top-3 end-2.5 text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center disabled:cursor-not-allowed" data-modal-hide="popup-modal" onClick={toggleModal} disabled={buttonDisable}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg className="mx-auto mb-4 text-black w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-black ">{modalContent}?</h3>
          <button data-modal-hide="popup-modal" type="button" className="text-white bg-black focus:ring-0 focus:outline-none font-medium text-sm inline-flex items-center px-5 py-2.5 text-center disabled:bg-primary-50 disabled:cursor-not-allowed" onClick={handelFunction} disabled={buttonDisable}>
            Yes, I'm sure
          </button>
          <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-black focus:outline-none bg-white border border-black focus:z-10 focus:ring-0 disabled:cursor-not-allowed" onClick={toggleModal} disabled={buttonDisable}>No, cancel</button>
        </div>
      </div>
    </div>
  </div>
);

export default Confirm;