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
  const [newLike, setNewLike] = useState<string>('');

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

  function addNewLike() {
    if (newLike == '' || newLike == undefined) {
      return;
    }

    setNewLikes(prevArray => [...prevArray, newLike]);
    setNewLike('');
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
              }}>&times;</div>
            </li>
          ))
          }
          <li className='like-container new-like'>
            <input
              type="text"
              autoFocus
              placeholder={`New ${isDislikes ? 'Dislike' : 'Like'} (e.g. Magic)`}
              value={newLike}
              onChange={(e) => { setNewLike(e.target.value) }}
              onKeyDown={(e) => { if (e.key == 'Enter') { addNewLike() } }}
            />
            <div className="remove-like add-like" onClick={() => { addNewLike() }}>
              &times;
            </div>
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
