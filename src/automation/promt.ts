export const prompt = (type: string, body: { title: string, content: string, link: string }, html?: string, imgs?: string[]) => {
    switch (type) {
        case "blog":
            return `
            Một bài blog hấp dẫn, sinh động về địa điểm hoặc sự kiện dưới đây khoảng 1500 chữ.
            Hãy chèn hình ảnh minh họa (dùng những url này ${imgs}) chèn vào giữa các đoạn.
            Nếu không có ${imgs} thì không dùng <figure><img></img></figure>.
            Toàn bộ nội dung phải nằm trong <div class="blog-post"> ... </div>.
            Đừng viết mã markdown, chỉ xuất HTML.
            ---
            Tiêu đề: ${body.title}
            Nội dung: dựa vào đoạn mã html mình cung cấp bên dưới"}
            ---
            Định dạng yêu cầu:

            <div>
                <h1>...</h1>
                <p>...</p>
                <figure>
                <img src="..." alt="..." />
                </figure>
                <p>...</p>
                ...
            </div>
            ---
            Đoạn mã HTML:
            ${html}

  `;
        case "keyword":
            return `Dựa vào tiêu đề ${body.title} hãy trả về một chuỗi keyword theo chuẩn SEO theo dạng string và cách nhau bằng dấu phẩy. chỉ xuất kết quả dạng string.`;
        case "description":
            return `Dựa vào tiêu đề ${body.title} hãy trả về một đoạn description theo chuẩn SEO theo dạng string và khoảng 150 từ. chỉ xuất kết quả dạng string.`;
        case "image":
            return `Tôi sẽ cung cấp cho bạn một đoạn mã HTML của một trang web trong đó là một bài viết. Nhiệm vụ của bạn là trích xuất chính xác URL của hình ảnh được sử dụng cho bài viết đó.

            Quy trình trích xuất:

            Bước 1: đọc bài viết từ đoạn mã html  cung cấp. 
            Bước 2: phân tích và tìm kiếm url của hình ảnh có trong bài viết đó. 
            Bước 3: lọc những và loại bỏ những url trùng nhau. không lấy url có tên miền "https://baomoi-photo-fbcrawler.bmcdn.me/". kiểm tra hình ảnh có Intrinsic size nhỏ hơn 500px * 200px thì không lấy. 
            Bước 4: Chỉ trả về các URL hình ảnh đã trích xuất bằng một chuỗi string và ngăn cách nhay bằng dấy phẩy, không thêm bất kỳ văn bản giải thích nào khác. Đừng viết mã markdown
            Đoạn mã HTML:

            ${html}
`
        case "archive":

            return `Tôi sẽ cung cấp cho bạn một đoạn mã HTML của một trang web trong đó là một list các bài viết. Nhiệm vụ của bạn là trích xuất chính xác URL của của bài viết và tiêu đề của bài viết đó.

            Quy trình trích xuất:

            Bước 1: tìm 10 thẻ <div> đầu tiên có  class là "group/card bm-card" trong đoạn mã html cung cấp.
            Bước 2: trong các thẻ <div> đó có  class là "bm-card-header" có thẻ h3. nội dung của thẻ h3 title của bài viết.
            Bước 3: trong các thẻ <div> đó có  class là "bm-card-header" có thẻ a và trong thẻ a này có một href . giá trị href này là link của bài viết. lấy đúng chính xác có giá trị tên miền.
            Bước 4: Chỉ trả về giá trị là một array chứa nhiều object 
            type của object như sau:
            {
                title:giá trị lấy được từ thẻ h3 ở bước b2
                link:giá trị lấy được từ thẻ a(href) ở bước b3
                content:title
            }
            không thêm bất kỳ văn bản giải thích nào khác. đừng trả về mã markdown chỉ trả về array json.

            Đoạn mã HTML:

            ${html}
`

        default:
            return ``
    }

} 