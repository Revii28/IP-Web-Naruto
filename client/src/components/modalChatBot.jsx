import { Modal, Ripple, initMDB } from "mdb-ui-kit";
import GeminiChatBot from "./ChatBotGemini";

initMDB({ Modal, Ripple });

const ModalChatBot = () => {
  return (
    <Modal tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-ripple-init=""
              data-mdb-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <GeminiChatBot />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-mdb-ripple-init=""
              data-mdb-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-mdb-ripple-init=""
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChatBot;
