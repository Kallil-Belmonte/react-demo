import { FunctionComponent, useRef, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'bootstrap';

import type { DeletePostModalState } from '@/pages/News/Post/_files/types';
import { useCustomState } from '@/shared/hooks';
import { deletePost } from '@/core/services';
import { Loader } from '@/shared/components';

const initialState: DeletePostModalState = {
  loading: false,
};

const DeletePostModal: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const modalRef = useRef<any>(null);

  const [state, setState] = useCustomState<DeletePostModalState>(initialState);
  const { loading } = state;

  const setUpModal = () => {
    modalRef.current.value = new Modal(modalRef.current);
  };

  const handleConfirmDeletePost = async () => {
    modalRef.current.value.hide();
    setState({ loading: true });

    try {
      await deletePost(id);
      navigate('/blog');
    } catch (error) {
      console.error(error);
      setState({ loading: false });
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setUpModal();
  });

  return (
    <>
      <Loader loading={loading} />

      <div id="delete-post-modal" className="modal fade" tabIndex={-1} ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center mb-0">Are you sure you want to delete this post?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmDeletePost}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePostModal;
