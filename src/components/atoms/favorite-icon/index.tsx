import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './index.scss';

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: number;
}

const FavoriteIcon = ({ isFavorite, onClick, size = 24 }: FavoriteIconProps) => {
  return (
    <div
      className="a-favorite-icon"
      onClick={onClick}
      role="button"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      tabIndex={0}
    >
      {isFavorite ? (
        <FaHeart size={size} className="a-favorite-icon__heart" />
      ) : (
        <FaRegHeart size={size} className="a-favorite-icon__heart" />
      )}
    </div>
  );
};

export default FavoriteIcon;
