# English Coach

Một skill của [Claude Code](https://docs.anthropic.com/en/docs/claude-code) biến mọi cuộc hội thoại thành buổi luyện tiếng Anh.

**Ngôn ngữ khác:**
[English](./README.md) | [中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt-BR.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## Skill này làm gì

Khi kích hoạt, Claude sẽ làm ba việc trong mỗi câu trả lời:

1. **Trả lời câu hỏi bình thường** — hoàn thành công việc chính trước
2. **Sửa lỗi tiếng Anh** — ngữ pháp, chính tả, từ vựng, dấu câu, cách diễn đạt
3. **Dạy điều mới** — cụm từ hữu ích, mẹo ngữ pháp, cách nói tự nhiên hơn

Thiết kế cho **người không phải bản ngữ tiếng Anh** muốn cải thiện tiếng Anh qua giao tiếp hàng ngày thay vì bài tập sách giáo khoa.

## Tính năng

- **Sửa lỗi theo danh mục**: Chính tả / Ngữ pháp / Từ vựng / Dấu câu / Diễn đạt
- **Thích ứng trình độ**: người mới tập trung vào cơ bản, người nâng cao tập trung vào sự tự nhiên
- **Theo dõi lỗi lặp lại**: lỗi lặp sẽ được đánh dấu đặc biệt
- **Nội dung học xoay vòng**: thành ngữ, mẹo ngữ pháp, cách diễn đạt nâng cao, lỗi phổ biến của người Việt
- **Giọng thân thiện**: như đồng nghiệp tốt bụng, không phải giáo viên khó tính

## Cài đặt

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## Cách dùng

Trong Claude Code, gõ:

```
/english-coach
```

Sau đó chat bằng tiếng Anh bình thường. Skill sẽ tự động sửa và dạy.

## Ví dụ

**Bạn nói:**
> I go to school yesterday and meet my friend

**Claude trả lời:**

*(trả lời câu hỏi)*

---

**English Corrections:**

> ~~I go to school yesterday~~ → **I went to school yesterday**
>
> **[Ngữ pháp]** "go" → "went" — "yesterday" là quá khứ, phải dùng thì quá khứ đơn
>
> ~~meet my friend~~ → **met my friend**
>
> **[Ngữ pháp]** "meet" → "met" — cũng cần dùng thì quá khứ cho phù hợp

**Cụm từ hôm nay:** "get the hang of" — dần quen và thành thạo việc gì đó.
*Ví dụ: I'm starting to get the hang of English tenses. (Tôi bắt đầu quen với các thì trong tiếng Anh.)*

## Giấy phép

MIT
