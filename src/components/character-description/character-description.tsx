import { Dispatch, SetStateAction, useState } from 'react';
import { Character } from '../../types/Character';
import LikesModal from '../likes-modal/likes-modal';
import './character-description.scss';

function CharacterDescription({
  character,
  setCharacter,
}: {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
}) {
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [openDislikesModal, setOpenDislikesModal] = useState(false);

  return (
    <div className="description-container">
      <div className="name-info">
        <div className="owner">
          <input
            type="text"
            style={{
              width: `${character.owner.length * 0.72}rem`,
            }}
            maxLength={30}
            value={character.owner}
            onChange={(e) => {
              setCharacter((prevChar) => {
                return { ...prevChar, owner: e.target.value };
              });
            }}
          ></input>
          <span>AS</span>
        </div>
        <div className="display-name">
          <input
            type="text"
            style={{
              width: `${character.displayName.length * 1.9}rem`,
            }}
            maxLength={30}
            value={character.displayName}
            onChange={(e) => {
              setCharacter((prevChar) => {
                return { ...prevChar, displayName: e.target.value };
              });
            }}
          ></input>
        </div>
        <div className="description">
          <input
            type="text"
            style={{
              width: `${character.description.length * 0.8}rem`,
            }}
            maxLength={30}
            value={character.description}
            onChange={(e) => {
              setCharacter((prevChar) => {
                return { ...prevChar, description: e.target.value };
              });
            }}
          ></input>
        </div>
      </div>
      <div className="extra-info">
        <div className="age-input">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            value={character.age}
            onChange={(e) => {
              setCharacter((prevChar) => {
                return { ...prevChar, age: +e.target.value || prevChar.age };
              });
            }}
          ></input>
        </div>
        <div className="likes-container">
          <div className="label">Likes</div>
          {character.likes.map((like, likeIndex) => {
            return (
              <div key={likeIndex} className="like">
                {like}
              </div>
            );
          })}
          <img
            className="edit-button"
            src="images/edit.svg"
            alt="edit"
            onClick={() => setOpenLikesModal(true)} />
        </div>
        <div className="dislikes-container">
          <div className="label">Dislikes</div>
          {character.dislikes.map((dislike, dislikeIndex) => {
            return (
              <div key={dislikeIndex} className="dislike">
                {dislike}
              </div>
            );
          })}
          <img
            className="edit-button"
            src="images/edit.svg"
            alt="edit"
            onClick={() => setOpenDislikesModal(true)} />
        </div>
      </div>

      {openLikesModal && (
        <LikesModal
          character={character}
          setCharacter={setCharacter}
          open={openLikesModal}
          handleClose={() => setOpenLikesModal(false)} />
      )}

      {openDislikesModal && (
        <LikesModal
          character={character}
          setCharacter={setCharacter}
          open={openDislikesModal}
          handleClose={() => setOpenDislikesModal(false)}
          isDislikes={true} />
      )}
    </div>
  );
}

export default CharacterDescription;
