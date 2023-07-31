import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ProductsSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          height: '175px',
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: 'rgba(128, 128, 128, 0.423) solid 1px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
            padding: '20px',
          }}
        >
          <Skeleton
            sx={{
              width: '80px',
              height: '32px',
            }}
          />
          <Skeleton
            sx={{
              marginTop: '-20px',
              width: '120px',
              height: '32px',
            }}
            animation="wave"
          />
          <Skeleton
            sx={{
              width: '50px',
              height: '32px',
            }}
            animation={false}
          />
        </Box>
        <Box
          sx={{
            height: '135px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
          }}
        >
          <Skeleton variant="rounded" width={90} height={90} />
          <Skeleton
            sx={{
              alignSelf: 'flex-end',
            }}
            variant="circular"
            width={28}
            height={28}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: '175px',
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: 'rgba(128, 128, 128, 0.423) solid 1px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
            padding: '20px',
          }}
        >
          <Skeleton
            sx={{
              width: '80px',
              height: '32px',
            }}
          />
          <Skeleton
            sx={{
              marginTop: '-20px',
              width: '120px',
              height: '32px',
            }}
            animation="wave"
          />
          <Skeleton
            sx={{
              width: '50px',
              height: '32px',
            }}
            animation={false}
          />
        </Box>
        <Box
          sx={{
            height: '135px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
          }}
        >
          <Skeleton variant="rounded" width={90} height={90} />
          <Skeleton
            sx={{
              alignSelf: 'flex-end',
            }}
            variant="circular"
            width={28}
            height={28}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: '175px',
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: 'rgba(128, 128, 128, 0.423) solid 1px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
            padding: '20px',
          }}
        >
          <Skeleton
            sx={{
              width: '80px',
              height: '32px',
            }}
          />
          <Skeleton
            sx={{
              marginTop: '-20px',
              width: '120px',
              height: '32px',
            }}
            animation="wave"
          />
          <Skeleton
            sx={{
              width: '50px',
              height: '32px',
            }}
            animation={false}
          />
        </Box>
        <Box
          sx={{
            height: '135px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: ' space-between',
          }}
        >
          <Skeleton variant="rounded" width={90} height={90} />
          <Skeleton
            sx={{
              alignSelf: 'flex-end',
            }}
            variant="circular"
            width={28}
            height={28}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductsSkeleton;
