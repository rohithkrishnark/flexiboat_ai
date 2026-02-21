import { Box, Typography } from '@mui/joy'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import { areaElementClasses, lineElementClasses } from '@mui/x-charts/LineChart'
import { chartsAxisHighlightClasses } from '@mui/x-charts/ChartsAxisHighlight'

const InfoCard = ({
  title = 'Not Given',
  total = 0,
  weeklyData = [],
  color = 'rgb(137, 86, 255)',
  description = "The total number "
}) => {
  return (
    <Box
      sx={{
        width: '24%',
        height: 100,
        display: 'flex',
        bgcolor: '#fff',
        borderRadius: 5,
        boxShadow: 'lg',
        p: 1.5
      }}
    >
      {/* LEFT */}
      <Box sx={{ width: '45%' }}>
        <Typography level="body-sm" sx={{ color: '#161616', fontWeight: 500,fontSize:16 }}>
          {title}
        </Typography>
        <Typography level="body-sm" sx={{ color: '#6b7280', fontWeight: 500, fontSize: 10 }}>
          {description}
        </Typography>
        <Typography level="h3" sx={{ fontWeight: 700, mt: 1 }}>
          {total}
        </Typography>
      </Box>

      {/* RIGHT (SPARK LINE) */}
      <Box
        sx={{
          width: '55%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end'
        }}
      >
        <SparkLineChart
          data={weeklyData}
          height={40}
          area
          showHighlight
          color={color}
          sx={{
            [`& .${areaElementClasses.root}`]: {
              opacity: 0.2
            },
            [`& .${lineElementClasses.root}`]: {
              strokeWidth: 2
            },
            [`& .${chartsAxisHighlightClasses.root}`]: {
              stroke: color,
              strokeWidth: 2
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default InfoCard