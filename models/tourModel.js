const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A Tour name must have less than 40 characters'],
      minlength: [10, 'A Tour name must have more than 10 characters'],
      validate: {
        message: 'Tour name must only contain letters (a-z).',
        validator: function (val) {
          return typeof val === 'string'
            ? validator.isAlpha(val.replace(/\s/g, ''))
            : true;
        },
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        message: 'Discount price ({VALUE}) should be regular price', // VALUE -> should be in capital only
        validator: function (value) {
          // this runs only for create a new document
          return value < this.price;
        },
      },
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficult is either : easy, medium, difficult',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String, // only file name
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: {
      type: String,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return Math.ceil(this.duration / 7);
});

// document middleware : runs before the "save" command and "create" command but not on "insertMany"

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });

  next();
});

// // document middlware: post will have access to the saved doc and middleware fn

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   console.log('doc is saved');
//   next();
// });

// query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({
    secretTour: {
      $ne: true,
    },
  });

  this.startTime = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log('time is ', Date.now() - this.startTime);
  next();
});

// tourSchema.pre('findOne', function (next) {
//   this.find({
//     secretTour: {
//       $ne: true,
//     },
//   });
//   next();
// });

// aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: {
        $ne: true,
      },
    },
  });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
