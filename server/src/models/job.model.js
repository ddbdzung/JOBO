const mongoose = require('mongoose');
const slugify = require('slugify');

const { toJSON, paginate } = require('./plugins');

const jobSchema = mongoose.Schema(
  {
    // Tiêu đề JOB
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    // Miêu tả JOB
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // Mô hình làm việc (từ xa, trực tiếp, hybrid)
    // hybrid: nửa online, nửa offline
    workPattern: {
      type: String,
      required: true,
      enum: ['online', 'offline', 'hybrid'],
    },
    // Thời gian làm việc (toàn thời gian, bán thời gian, theo dự án)
    workTime: {
      type: String,
      required: true,
      enum: ['fullTime', 'partTime', 'onProject'],
    },
    // Phương thức thanh toán
    paymentMethod: {
      type: String,
      required: true,
      enum: ['perHour', 'perMonth', 'perProject'],
    },
    // Nơi làm việc
    location: {
      type: String,
      trim: true,
    },
    // Thời điểm kết thúc tuyển JOB
    // Nếu có thể thì ít nhất 8 tiếng kể từ thời điểm đăng bài => endTime - Now >= 8h
    // Nhưng hiện tại thì chỉ cần > Date.now()
    endTime: {
      type: Date,
      required: true,
    },
    // Số lượng người tối đa được tuyển trong JOB
    maxJobber: {
      type: Number,
      required: true,
      min: 1,
    },
    // Mức kinh phí có thể trả cho nhân viên nhận JOB
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    // Trạng thái JOB, mặc định khi mở JOB sẽ là pending (đang tuyển)
    status: {
      type: String,
      enum: ['pending', 'active', 'done'],
      default: 'pending',
    },
    // ID người tuyển dụng
    clientUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Lĩnh vực JOB đề cập đến
    fields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
      },
    ],
    // 1 mảng các JobNegotiation định danh các ứng viên tham gia vào job
    // Đàm phán công việc giữa nhà tuyển dụng và ứng viên
    jobberNegotiation: [
      {
        jobberUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        // Nội dung thuyết phục nhà tuyển dụng thuê bản thân
        persuasionContent: {
          type: String,
          minLength: 15,
        },
        // Giải pháp đề xuất cho vấn đề của JOB
        solution: {
          type: String,
        },
        status: {
          type: String,
          enum: ['pending', 'joined', 'rejected'],
          default: 'pending',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
jobSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

jobSchema.pre('save', async function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
