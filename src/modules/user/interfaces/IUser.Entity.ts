

export interface IUserEntity {
  id: string
  name: string;
  mobile: string;
  avatar: string;
  createdAt: Date
  updatedAt: Date
    // @ManyToMany(()=> SubcategoryPG, subcategory => subcategory.folowingUsers)
    // @JoinTable()
    // favoriteSubcategories!: ISubcategoryPG[]
  
    // @OneToMany(()=> CommentPG, comment => comment.user)
    // comment!: string[];
  
    // @OneToMany(() => CommentReplayPG, commentReplay => commentReplay.user)
    // commentReplies!: string[];
  
    // @ManyToMany(()=> PostPG, post => post.favoriteBy)
    // @JoinTable()
    // favoritePosts!: PostPG[];
}