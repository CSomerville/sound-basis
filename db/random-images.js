const plane1 = "http://plants.oaklandnursery.com/Content/Images/Photos/F969-08.jpg";
const plane2 = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaomlu4cRWlR3A61z2sLnO-GV1loOjY6CaSpYdR8fDAdwmOLuM2Q";
const plane3 = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQxv4D1FOdTh4IbWLT9xBoRQdWFvZLnv9fl6RJUn6mCNQUIWU7T";
const plane4 = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSBqLQEv6eXWdat6eBtsGTphKVyqjxkNB0qigbt00NjRzrDPWAJ";

module.exports = () => [
  plane1,
  plane2,
  plane3,
  plane4
][Math.floor(Math.random() * 3)];
