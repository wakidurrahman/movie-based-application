import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './index.scss';

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: number;
  color?: string;
}

const FavoriteIcon = ({ isFavorite, onClick, size = 24, color = '#ff4d4f' }: FavoriteIconProps) => {
  return (
    <div
      className="a-favorite-icon"
      onClick={onClick}
      role="button"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      tabIndex={0}
    >
      {isFavorite ? (
        <FaHeart size={size} color={color} />
      ) : (
        <FaRegHeart size={size} color={color} />
      )}
    </div>
  );
};

export default FavoriteIcon;
