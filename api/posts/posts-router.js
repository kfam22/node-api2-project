// implement your posts router here
const Posts = require('./posts-model');
const router = require('express').Router();


router.get('/', (req, res) =>{
    Posts.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err =>{
        res.status(500).json({
            message: "The posts information could not be retrieved",
            error: err.message
        })
    })
})

router.get('/:id', (req, res) =>{
   let { id } = req.params 
   Posts.findById(id)
    .then(post=>{
        if(post == null){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else{
            res.json(post);
        }
    })
    .catch(err =>{
        res.status(500).json({
            message: "The posts information could not be retrieved",
            error: err.message
        })
    })
})

// alternative way with try/catch
// router.get('/:id', async (req, res) =>{
//     let { id } = req.params
//     try{
//         const post = await Posts.findById(id);
//         if (!post){
//             res.status(404).json({
//                 message: "The post with the specified ID does not exist"
//             })
//         } else{
//             res.json(post)
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "The posts information could not be retrieved",
//             error: err.message
//         })
//     }
// })

router.post('/', (req, res) =>{
    const { title, contents } = req.body;
    if(!title || !contents){
        res.status(400).json({ message: "Please provide title and contents for the post"})
    } else {
        console.log('body', req.body)
        Posts.insert(req.body)
        .then(post =>{
            res.status(201).json({
                ...post,
                ...req.body
            })
        })
        .catch(err =>{
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                error: err.message
            })
        })
    }

})
router.put('/:id', (req, res) =>{

})
router.delete('/:id', (req, res) =>{

})
router.get('/:id/comments', (req, res) =>{

})

module.exports = router;

// ADOPTERS ENDPOINTS
// router.get('/', (req, res) => {
//     Adopter.find(req.query)
//       .then(adopters => {
//         res.status(200).json(adopters);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the adopters',
//         });
//       });
//   });
  
//   router.get('/:id', (req, res) => {
//     Adopter.findById(req.params.id)
//       .then(adopter => {
//         if (adopter) {
//           res.status(200).json(adopter);
//         } else {
//           res.status(404).json({ message: 'Adopter not found' });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the adopter',
//         });
//       });
//   });
  
//   router.get('/:id/dogs', (req, res) => {
//     Adopter.findDogs(req.params.id)
//       .then(dogs => {
//         if (dogs.length > 0) {
//           res.status(200).json(dogs);
//         } else {
//           res.status(404).json({ message: 'No dogs for this adopter' });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the dogs for this adopter',
//         });
//       });
//   });
  
//   router.post('/', (req, res) => {
//     Adopter.add(req.body)
//       .then(adopter => {
//         res.status(201).json(adopter);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error adding the adopter',
//         });
//       });
//   });
  
//   router.delete('/:id', (req, res) => {
//     Adopter.remove(req.params.id)
//       .then(count => {
//         if (count > 0) {
//           res.status(200).json({ message: 'The adopter has been nuked' });
//         } else {
//           res.status(404).json({ message: 'The adopter could not be found' });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error removing the adopter',
//         });
//       });
//   });
  
//   router.put('/:id', (req, res) => {
//     const changes = req.body;
//     Adopter.update(req.params.id, changes)
//       .then(adopter => {
//         if (adopter) {
//           res.status(200).json(adopter);
//         } else {
//           res.status(404).json({ message: 'The adopter could not be found' });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({
//           message: 'Error updating the adopter',
//         });
//       });
//   });