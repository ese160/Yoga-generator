import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import React from 'react';

export function CardDefault({
  name,
  imageUrl,
  poseDescription,
  difficultyLevel,
  focusArea,
  onClick,
  buttonOnClick,
  onSave,
  isSelected,
  showFooter,
}) {
  return (
    <Card
      className={`mt-6 w-96 transform transition-transform duration-500 hover:scale-105 card-container ${
        isSelected ? 'selected' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-56 transition-height duration-500 hover:h-64"
      >
        <img
          src={imageUrl}
          alt="card-image"
          className="transition-opacity duration-500 hover:opacity-80"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography>{poseDescription}</Typography>
        {difficultyLevel && ( // Conditionally render the difficulty level
          <Typography variant="paragraph" color="blue-gray" className="mt-2">
            Difficulty: {difficultyLevel}
          </Typography>
        )}
        {focusArea && ( // Conditionally render the difficulty level
          <Typography variant="paragraph" color="blue-gray" className="mt-2">
            Focus Area: {focusArea}
          </Typography>
        )}
      </CardBody>
      {showFooter && (
        <CardFooter className="pt-0 flex items-center">
          <Button
            className="transition-colors duration-500 hover:bg-blue-500 mr-4"
            onClick={buttonOnClick}
          >
            Read More
          </Button>
          <Button
            className="transition-colors duration-500 hover:bg-blue-500"
            onClick={onSave}
          >
            Save Pose
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

CardDefault.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  poseDescription: PropTypes.string.isRequired,
  difficultyLevel: PropTypes.string, // Add the new prop type
  onClick: PropTypes.func,
  buttonOnClick: PropTypes.func,
  onSave: PropTypes.func,
  isSelected: PropTypes.bool,
  focusArea: PropTypes.string,
  showFooter: PropTypes.bool,
};

CardDefault.defaultProps = {
  isSelected: false,
};
