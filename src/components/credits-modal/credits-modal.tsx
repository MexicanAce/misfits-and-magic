import CustomModal from '../custom-modal/custom-modal';
import './credits-modal.scss';

function CreditsModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={'Credits'}>
      <div className="credits">
        <div>
          Website created by <a target="_blank" href="https://nvillanueva.com">Nicolas Villanueva</a>
        </div>
        <div>
          Source code is available on <a target="_blank" href="https://github.com/MexicanAce/misfits-and-magic">GitHub</a>
        </div>
        <div>
          Based on the character sheets from
          <a target="_blank" href="https://www.dropout.tv/dimension-20-misfits-and-magic">
            Dimension20's Misfits & Magic
          </a>
          series
        </div>
        <div>
          Art from the series by
          <a target="_blank" href="https://twitter.com/ailustrar">
            Adrián Ibarra Lugo (characters)
          </a>
          and
          <a target="_blank" href="https://twitter.com/chamonkee">
            William Kirkby (maps)
          </a>
        </div>
        <div>
          Shout out to Dan, Eleni, and Charles for user feedback along the way
        </div>
        <div>
          This is a fan project, where I just wanted a "living" character sheet
          to use and share with friends. Feel free to use this website for your campaigns!
        </div>
      </div>
    </CustomModal>
  );
}

export default CreditsModal;
