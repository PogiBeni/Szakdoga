const groupModel = require('../models/groupModel');

async function createGroup(req, res) {
  const { groupName, creatorUserId, creatorName, description } = req.body;

  try {
    const groupId = await groupModel.createGroup(groupName, creatorUserId, creatorName, description);
    res.json({ id: groupId, groupName, creatorUserId, creatorName, description });
  } catch (error) {
    console.error('Error creating a group:', error);
    res.status(500).json({ error: 'Error creating a group' });
  }
}

async function getGroup(req, res) {
  const groupId = req.params.id;

  try {
    const group = await groupModel.getGroupById(groupId);

    if (!group) {
      res.status(404).json({ message: 'Group not found' });
    } else {
      res.json(group);
    }
  } catch (error) {
    console.error('Error getting a group:', error);
    res.status(500).json({ error: 'Error getting a group' });
  }
}

async function updateGroup(req, res) {
  const group = req.body;

  try {
    // Call the model to update the group
    await groupModel.updateGroup(group);
    res.json({ message: 'Group updated successfully' });
  } catch (error) {
    console.error('Error updating a group:', error);
    res.status(500).json({ error: 'Error updating a group' });
  }
}

module.exports = {
  createGroup,
  getGroup,
  updateGroup,
};
