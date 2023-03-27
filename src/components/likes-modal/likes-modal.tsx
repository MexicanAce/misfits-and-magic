import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import CustomModal from '../custom-modal/custom-modal';
import './likes-modal.scss';

function LikesModal({
  character,
  setCharacter,
  open,
  handleClose,
  isDislikes = false,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  open: boolean;
  handleClose: () => void;
  isDislikes?: boolean;
}) {

  const [newLikes, setNewLikes] = useState<string[]>(isDislikes ? character.dislikes : character.likes);

  function onConfirm() {
    if (isDislikes) {
      setCharacter((prevChar) => {
        return { ...prevChar, dislikes: newLikes }
      });
    } else {
      setCharacter((prevChar) => {
        return { ...prevChar, likes: newLikes }
      });
    }

    handleClose();
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={isDislikes ? 'Dislikes' : 'Likes'}>
      <div className="likes-selector">
        <ul>
          {newLikes.map((like, likeIndex) => (
            <li
              key={likeIndex}
              className={`like-container`}>
              <input type="text" value={like} onChange={(e) => {
                setNewLikes(prevArray => prevArray.map((x, i) => likeIndex == i ? e.target.value : x))
              }} />
              <div className="remove-like" onClick={() => {
                setNewLikes(prevArray => prevArray.filter((x, i) => likeIndex != i))
              }}></div>
            </li>
          ))
          }
          <li>
            <button
              className="add-another-button"
              onClick={() => setNewLikes(prevArray => [...prevArray, isDislikes ? 'New Dislike' : 'New Like'])}>
              Add another
            </button>
          </li>
        </ul>
      </div>
      <button
        className="modal-button"
        onClick={onConfirm}>
        Confirm
      </button>
    </CustomModal>
  );
}

export default LikesModal;
