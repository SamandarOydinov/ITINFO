const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  author_id: String,
  topic_title: String,
  topic_text: String,
  is_checked: Boolean,
  is_approved: Boolean,
  expert_id: String

});

module.exports = model("Topic", topicSchema);
