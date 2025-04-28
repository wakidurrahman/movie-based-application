import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: number;
  color?: string;
}

const FavoriteIcon = ({ isFavorite, onClick, size = 24, color = '#ff4d4f' }: FavoriteIconProps) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer', display: 'inline-block' }}
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
