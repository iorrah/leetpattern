import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// Prisma 7 Pattern: Setup the LibSQL driver adapter for standalone execution
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

const questions = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',

    problemStatement: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input has **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,

    examples: `- Input: nums = [2,7,11,15], target = 9
- Output: [0,1]
- Explanation: Because nums[0] + nums[1] = 9, return [0,1].

---

- Input: nums = [3,2,4], target = 6
- Output: [1,2]
- Explanation: Because nums[1] + nums[2] = 6, return [1,2].

---

- Input: nums = [3,3], target = 6
- Output: [0,1]
- Explanation: The same element cannot be used twice, so return the indices of the two different elements.`,

    initialCode: `function twoSum(nums, target) {
  // Write your code here

};`,

    constraints: `* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* Only one valid answer exists.`,
  },

  {
    title: 'Find Missing Number',
    slug: 'find-missing-number',
    difficulty: 'Easy',

    problemStatement: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array.*`,

    examples: `- Input: nums = [3,0,1]
- Output: 2
- Explanation: The numbers from 0 through 3 should all be present. The missing number is 2.

---

- Input: nums = [0,1]
- Output: 2
- Explanation: The expected range is [0,2], so 2 is the missing value.

---

- Input: nums = [9,6,4,2,3,5,7,0,1]
- Output: 8
- Explanation: Every number from 0 through 9 appears except 8.`,

    initialCode: `function missingNumber(nums) {
  // Write your code here

};`,

    constraints: `* \`n == nums.length\`
* \`1 <= n <= 10^4\`
* \`0 <= nums[i] <= n\`
* All the numbers of \`nums\` are unique.`,
  },

  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',

    problemStatement: `Given two strings \`s\` and \`t\`, return \`true\` *if \`t\` is an anagram of \`s\`, and \`false\` otherwise.*

An **Anagram** is a word or phrase formed by rearranging the letters of another word or phrase using all of the original letters exactly once.`,

    examples: `- Input: s = "anagram", t = "nagaram"
- Output: true
- Explanation: Both strings contain the same characters with the same frequencies.

---

- Input: s = "rat", t = "car"
- Output: false
- Explanation: The strings contain different characters, so they are not anagrams.

---

- Input: s = "listen", t = "silent"
- Output: true
- Explanation: Rearranging the letters of "listen" forms "silent".`,

    initialCode: `function isAnagram(s, t) {
  // Write your code here

};`,

    constraints: `* \`1 <= s.length, t.length <= 5 * 10^4\`
* \`s\` and \`t\` consist of lowercase English letters.`,
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  await prisma.question.deleteMany({});

  for (const question of questions) {
    const created = await prisma.question.create({
      data: question,
    });

    console.log(`✅ Created question: ${created.title}`);
  }

  console.log('🏁 Database seeding completed successfully.');
}

main()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
