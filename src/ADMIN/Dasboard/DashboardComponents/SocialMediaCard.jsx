import { Box, Typography } from '@mui/joy';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

const SocialMediaCard = ({
  title = 'Social Media',
  description = 'Visit our page',
  icon,
  link = '#',
  color = '#2563eb',
}) => {
  const handleClick = () => {
    window.open(link, '_blank'); // open in new tab
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: '24%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#fff',
        borderRadius: 5,
        boxShadow: 'lg',
        p: 1.5,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
        },
      }}
    >
      {/* LEFT ICON */}
      <Box
        sx={{
          width: 45,
          height: 45,
          borderRadius: '50%',
          bgcolor: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1.5,
        }}
      >
        {icon}
      </Box>

      {/* TEXT */}
      <Box sx={{ flex: 1 }}>
        <Typography level="body-sm" sx={{ fontWeight: 600, fontSize: 14 }}>
          {title}
        </Typography>
        <Typography level="body-xs" sx={{ color: '#6b7280', fontSize: 11 }}>
          {description}
        </Typography>
      </Box>

      {/* RIGHT ARROW */}
      <OpenInNewRoundedIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
    </Box>
  );
};

export default SocialMediaCard;