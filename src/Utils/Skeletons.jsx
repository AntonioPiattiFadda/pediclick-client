import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const ProductsSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(calc(50vw - 40px), 1fr))',
          gap: '30px',
          alignItems: 'center',
          justifyItems: 'center',
          maxHeight: '65vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 'calc(50vw - 20px)',
            minHeight: '7.5rem',
            borderRadius: ' 0.3125rem',
          }}
        />
      </Box>
    </>
  );
};
export const ProductsSkeletonFirst = () => {
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

export const PromoProductsSkeleton = () => {
  return (
    <Box
      sx={{
        height: '216px',
        width: '100vw',
        display: 'flex',
        overflowY: 'auto',
        gap: '20px',
      }}
    >
      <Skeleton
        sx={{
          width: '140px',
          height: '250px',
          border: '1px solid lightgray',
          marginTop: '-20px',
          marginLeft: '20px',
        }}
      />

      <Skeleton
        sx={{
          width: '140px',
          height: '250px',
          border: '1px solid lightgray',
          marginTop: '-20px',
          marginLeft: '20px',
        }}
      />
    </Box>
  );
};

export const DetailProductsSkeleton = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 130px)',
        width: '95vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton
        sx={{
          width: 'calc(100% - 60px)',
          height: '350px',
          border: '1px solid lightgray',
          marginTop: '-40px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '95vw',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginLeft: '10px',
            marginBottom: '20px',
          }}
        >
          <Skeleton
            sx={{
              width: '140px',
              height: '15px',
              border: '1px solid lightgray',
              marginTop: '-20px',
            }}
          />
          <Skeleton
            sx={{
              width: '140px',
              height: '15px',
              border: '1px solid lightgray',
              marginTop: '-20px',
            }}
          />
          <Skeleton
            sx={{
              width: '140px',
              height: '15px',
              border: '1px solid lightgray',
              marginTop: '-20px',
            }}
          />
        </Box>
        <Skeleton
          sx={{
            width: '35px',
            height: '35px',
            marginRight: '40px',
          }}
        />
      </Box>
    </Box>
  );
};
